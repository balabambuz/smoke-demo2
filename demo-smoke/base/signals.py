from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs): ##voglio aggiornare l'username in contemporanea alla mail
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)#argument
