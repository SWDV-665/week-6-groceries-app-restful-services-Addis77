import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesService } from './groceries.service';

@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {

  constructor(public alertCtrl: AlertController, public groceriesService: GroceriesService) {
    console.log('Hello InputDialogServiceProvider Provider');
  }
  
  async showPrompot(item?:any, index?:any,id?:any) {
    const prompt =await this.alertCtrl.create({
      header:item ? 'Edit Item':"Add Item",
      message: item ? "Please Edit item...": "Please enter item name...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Item Name',
          value:item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Item quantity',
          value:item ? item.quantity: null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item); 
            if (index !==undefined){
            this.groceriesService.editItem(item, index,id);
          }
          else{
            this.groceriesService.addItem(item);
          }
        }
      }
      ]
    });
    prompt.present();
  }

}

