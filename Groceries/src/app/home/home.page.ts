import { GroceriesService } from './../services/groceries.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ModalControllerService } from '../services/modal-controller.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = "Grocery";

  items :any[]= [];
  errorMessage: string;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesService, public modalControllerService: ModalControllerService, public socialSharing: SocialSharing) {
    this.errorMessage = ''
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }
ngOnInit(): void {
  this.loadItems();
  
}

  loadItems():any{
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }

    //Remove item from items array
    async removeItem(item:any, index:any){
      const delItemName = item.name;
      this.dataService.removeItem(item._id);
  
      const toast = this.toastCtrl.create({
        message: 'Removed ' + delItemName + ".",
        duration: 3000
      });
      (await toast).present();
    }


  async shareItem(item:any, index:any) {
    console.log("Share Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Sharing Item - ' + index + "...",
      duration: 3000
    });
    toast.present(); 
    
    let message = "Grocery Item - Name: " + item.name  + " - Quantity: " + item.quatity;
    let subject = "Share via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared succdefully!")
    }).catch((error) => {
      console.error("Error while sharing", error);
    });

  }

  async editItem(item:any, index:any) {
    let id = item._id;
    this.modalControllerService.showPrompot(item, index,id);

    const toast = this.toastCtrl.create({
      message: 'Edittitng Item - ' + index + "...",
      duration: 3000
    });
    (await toast).present();
  }

  addItem() {
    console.log("Adding Item");
    this.modalControllerService.showPrompot();
  }

  

}
