from django.http import JsonResponse 
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User


from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status




class MyTokenObtainPairSerializer(TokenObtainPairSerializer): ##customizza il JWT con informazioni specifiche che scegliamo noi
      def validate(self, attrs):
        data = super().validate(attrs) #stiamo facendo un override della funzione validate Quindi avremo comunque i token di ACCESS e REFRESH

        serializer = UserSerializerWithToken(self.user).data 
        #esegue un loop nei campi del serializer, per ogni elemento a indice K sta una V all'interno dell'oggetto data
        for k, v  in serializer.items():
            data[k] = v 
        
        return data


                                                                                      
class MyTokenObtainPairView(TokenObtainPairView):#spedisce il serializer customizzato 
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        #l'oggetto che riceviamo dalla request è un QueryDict: {'name':['Mario Rossi'], 'email': [bobo@mail.com], 'password': ['john1324']}
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False) ##crea il JWT per il nuovo utente registrato
        return Response(serializer.data)
    except:
        message = {'detail':'User with this email already exists'}#riporta questo
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):#dalla request ricevo l'utente nel BE + l'utente inserito nel FE
    user= request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    #AGGIORNO I VALORI DELL'ISTANZA
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    #SEl'utente ha inserito qualcosa nell'input rifaccio l'hashing della password
    if data['password'] != '':
        user.password = make_password(data['password'])
    
    user.save()

    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user= request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers (request):
    users = User.objects.all() ##per farlo funzionare ho bisogno di User inteso come modello quindi l'ho importato
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

#ottengo gli utenti dalla dashboard dell'admin

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk) 
    serializer = UserSerializer(user, many=False)#se uso userSerializer avrò in PostMan il Json senza TOKEN
    return Response(serializer.data)


#modifico gli utenti dalla sezione dell'Admin

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user= User.objects.get(id=pk)

    data = request.data
    
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
    
    serializer = UserSerializer(user, many=False)
    
    user.save()

    return Response(serializer.data)

    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')



    