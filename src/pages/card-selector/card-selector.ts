import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-selector',
  templateUrl: 'card-selector.html',
})
export class CardSelectorPage {
  color_selected = "d";
  card_selected = "A";
  colors =["d","h","c","s"];
  cards =["A","K","J","T","9","8","7","6","5","4","3","2"];
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams) {

      this.color_selected = this.navParams.get("color_selected")?this.navParams.get("color_selected"):"d";
      this.card_selected = this.navParams.get("card_selected")?this.navParams.get("card_selected"):"A";

      console.log("this.color_selected",this.color_selected);
      console.log("this.card_selected",this.card_selected);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardSelectorPage');
  }

  selectCard(card){
    this.card_selected = card;
  }
  selectColor(color){
    this.color_selected = color;
  }

  submit(){
   this.viewCtrl.dismiss({card_selected:this.card_selected,color_selected:this.color_selected});
  }
  dismiss(){
   this.viewCtrl.dismiss(null);
  }

}
