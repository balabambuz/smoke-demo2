from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress, Review, Post, Work


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)#get_name
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','_id', 'username', 'email', 'name', 'isAdmin'] #campi ritornati dall'API presenti nell'istanza di User
                                                                      #funzioni per ottenere altri campi
    def get__id(self, obj): 
        return obj.id #prendiamo gli stessi elementi del model ma con nome diverso

    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self,obj): #self sarà il serializer e obj sarà l'User model
        name = obj.first_name
        if name == '': #se il firstname è vuoto allora il nome identificativo sarà la mail 
            name = obj.email
       
        return name



class UserSerializerWithToken(UserSerializer):      #REFRESHA  il token di autorizzazione per l'utente
    token = serializers.SerializerMethodField(read_only=True)
    class Meta: 
        model = User
        fields = ['id','_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)#obj è l'utente, quindi è il token personale dell'user
        return str(token.access_token)#invece di ritornare un refresh da un access   


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True) #è un serializzatore all'interno di un altro

    class Meta:
        model = Product
        fields = '__all__'
    
    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):#nested object from class
    orderItems = serializers.SerializerMethodField(read_only=True) #prende il valore dalla funzione get_orders
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
    
    def get_orderItems(self, obj):#obj = Order
        items = obj.orderitem_set.all()   #restituisce tutti gli oggetti della relazione inversa(Foreign Key)
        serializer = OrderItemSerializer(items, many=True)#seconda serializzazione dentro al serializer
        return serializer.data
    
    def get_shippingAddress(self, obj):
        try:
            address =  ShippingAddressSerializer(obj.shippingaddress, many=False).data #relazione di attributo inversa
        except:
            address =  False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class PostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_username(self, obj):
        return obj.user.first_name if obj.user else ''
        

class WorkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Work
        fields = '__all__'




