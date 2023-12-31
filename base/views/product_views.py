from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


from base.models import Product, Review
from base.serializers import ProductSerializer

 
from rest_framework import status



@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    print('query:', query)
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query) #contains è case sensitive mentre icontains non lo è

    page = request.query_params.get('page')#numero di pagina richiesto
    paginator = Paginator(products,6) #Oggetto e numero di oggetti da mostrare per query


    try:
        products = paginator.page(page)#con il metodo page ottengo la pagina corrispondente
    except PageNotAnInteger:
        products = paginator.page(1)#se non è un numero va a pag 1
    except EmptyPage:
        products = paginator.page(paginator.num_pages)#se è un numero maggiore delle pag disponibili reinderizza al numero più alto
    
    if page == None:
        page = 1
    
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page':page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(requests):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5] #prende i primi 5 prodotti
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
    #return JsonResponse(products, safe=False)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product was deleted')



@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')#sostituisco immagine del prodotto con l'immagine contenuta nella request
    product.save()
    return Response('image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1 - review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail':'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2 - No Rating or 0  
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #3 - Create Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        #raccolgo il numero totale delle reviews per il Product
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0 
        for i in reviews:
            total += i.rating
        
        product.rating = total / len(reviews)
        product.save()

        return Response({'Review Added'})