import { Component } from '@angular/core';
import { IonicPage, Platform, ModalController, AlertController, NavController, ActionSheetController,LoadingController, ToastController, PopoverController } from 'ionic-angular';
import { calculateEquity } from 'poker-odds'
import { TranslateService } from '@ngx-translate/core';

import { LangPage } from '../lang/lang';
import { InfoPage } from '../info/info';
import { CardSelectorPage } from '../card-selector/card-selector';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hands = [[null,null],[null,null]];
  board = [];
  results = [];
  hands_update = "counter";
  board_update = "flop";
  showButtons = false;

  i18n: string[] = [];
  loading: any = null;

  constructor(
    private translate: TranslateService,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private platform: Platform,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController
  ) {


    this.platform.ready().then(() => {
      this.refreshLang();

    });

    this.translate.onLangChange.subscribe((event) => {
      setTimeout(() => {
        this.refreshLang();
      },400);
    });

  }

  ionViewDidLoad(){

    this.hands = [['As', 'Kh'],['Js', 'Jh'],['9d', '9c']];
    this.board = ['Ad', 'Qh', 'Jc'];//, '10s','9s'];
    // this.board = [];
    this.refresh();
  }

  async refresh(){
    this.presentLoading();
    console.log("refresh");
    let iterations = 100000; // optional
    let exhaustive = true; // optional
    console.log("hands",this.hands);
    console.log("board",this.board);
    let error = {error:false,type:null};
    let list_all_cards = [];
    for(let hands of this.hands){
      if(hands[0] == null || hands[1] == null){
        console.log("A", hands);
        error = {error:true,type:'empty'};
        this.hideLoading();
        break;
      }
      else {
        if(list_all_cards.indexOf(hands[0]) == -1)
          list_all_cards.push(hands[0]);
        else{
          this.hideLoading();
          return this.presentAlert('Outch, we have an error !','The card ' + hands[0] + ' is selected two times');
        }

        if(list_all_cards.indexOf(hands[1]) == -1)
          list_all_cards.push(hands[1]);
        else {
          this.hideLoading();
          return this.presentAlert('Outch, we have an error !','The card ' + hands[1] + ' is selected two times');
        }
      }
    }
    for(let card_board of this.board){
      if(card_board == null){
        console.log("B", card_board);
        error = {error:true,type:'empty'};
        this.hideLoading();
        break;
      }
      else {
        if(list_all_cards.indexOf(card_board) == -1)
          list_all_cards.push(card_board);
        else {
          this.hideLoading();
          return this.presentAlert('Outch, we have an error !','The card ' + card_board + ' is selected two times');
        }
      }
    }
    if(error.error){
      this.results = [];
      return;
    }

    try {
      console.log("calculateEquity");
      let board = this.board.length == 0 ? undefined : this.board;
      console.log("calculateEquity board", board)
      let results = await calculateEquity(this.hands, board, iterations, exhaustive);
      for(let result of results){
        result.percent = ((result.wins/results[0].count)*100).toFixed(2);
        result.ties_percent = ((results[0].ties/results[0].count)*100).toFixed(2);
      }
      this.results = results;
      console.log("results",this.results);
      this.hideLoading();
    }
    catch(error) {
      let error_string = error.toString();
      console.log("error_string",error_string);
      // if(error_string == "TypeError: Cannot read property '0' of null")
      //   return;
      // else
      this.presentAlert('Outch, we have an error !','Try to change board or other cards');
      console.warn(error);
      this.hideLoading();
    }
  }


  refreshLang(){
    // console.log("refresh lang");
    this.translate
      .get([
        'PICTURE_ADDED_TO_GALLERY',
        'PICTURE_DOWNLOADED',
        'ERROR_SAVING_GALLERY',
        'EXPORT_IN_PROGRESS',
        'TITLE_ALERT_LEAVE',
        'MESSAGE_ALERT_LEAVE',
        'SAVE',
        'LEAVE_WITHOUT_SAVE',
        'SELECT_PICTURE',
        'OK',
        'YES',
        'NO',
        'CANCEL',
        'TITLE',
        'SUBTITLE',
        'DEMO_PICTURE',
        'LOAD_FROM_LIBRARY',
        'LOAD_FROM_COMPUTER',
        'USE_CAMERA'
      ])
      .subscribe(value => {
        this.i18n = value;
        // console.log("this.i18n",this.i18n);
      });
  }

  goToInfo(){
    this.navCtrl.push(InfoPage);
  }

  boardUpdate(){
    // console.log("boardUpdate",value);
    // this.board_update = value;
    // if(this.board_update == "preflop" ){
    //   this.board = [];
    //   this.refresh();
    //   return;
    // }
    // if(this.board_update == "flop"){
    //   if(this.board.length == 4)
    //   this.board.splice(-1,1);
    //   if(this.board.length == 5)
    //   this.board.splice(-2,2);
    // }

    // if(this.board.length == 0){
    //   if(this.board_update != "preflop"){
    //     this.board.push(null);
    //     this.board.push(null);
    //     this.board.push(null);
    //   }
    // }
    if(this.board.length == 3){
      if(this.board_update == "turn" || this.board_update == "river")
        this.board.push(null);
    }
    if(this.board.length == 4){
      if(this.board_update == "flop")
        this.board.splice(-1,1);
      if(this.board_update == "river")
        this.board.push(null);
    }

    if(this.board.length == 5){
      if(this.board_update == "turn")
        this.board.splice(-1,1);
      if(this.board_update == "flop")
        this.board.splice(-2,2);
    }
    //     this.board.splice(-1,1);
    // }
    //
    // if(this.board_update == "river"){
    //   if(this.board.length == 3){
    //     this.board.push(null);
    //   }
    //   if(this.board.length == 4)
    //     this.board.push(null);
    // }
    this.refresh();
  }
  handsUpdate(){
    console.log("handsUpdate",this.hands_update);
    if(this.hands_update == "plus"){
      this.hands.push([null,null]);
      this.refresh();
    }
    else if(this.hands_update == "minus"){
      this.hands.splice(-1,1);
      this.refresh();
    }
    else {
      console.log("this.hands_update else");
    }
    console.log("set to default");
    document.getElementById("counter").click();
  }


  presentCardSelectorModal(card_type, index_cards,index_card = null) {
    let card_selected =  null;
    let color_selected = null;
    if(card_type == 'hands'){
      if(this.hands[index_cards][index_card] && this.hands[index_cards][index_card][0])
        card_selected = this.hands[index_cards][index_card][0];
      if(this.hands[index_cards][index_card] && this.hands[index_cards][index_card][1])
        color_selected = this.hands[index_cards][index_card][1];
    }
    else if(card_type == 'board'){
      if(this.board[index_cards] && this.board[index_cards][0])
        card_selected = this.board[index_cards][0];
      if(this.board[index_cards] && this.board[index_cards][1])
        color_selected = this.board[index_cards][1];
    }

   let cardSelectorModal = this.modalCtrl.create(CardSelectorPage,{color_selected:color_selected,card_selected:card_selected});
   cardSelectorModal.onDidDismiss(data => {
     console.log("onDidDismiss data", data);
     console.log("onDidDismiss card_type", card_type);
     console.log("onDidDismiss index_cards", index_cards);
     if(data != null){
       if(card_type == 'hands')
        this.hands[index_cards][index_card] = data.card_selected + "" + data.color_selected;
       else if(card_type == 'board')
        this.board[index_cards] = data.card_selected + "" + data.color_selected;
       this.refresh();
     }
   });
   cardSelectorModal.present();
 }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(LangPage);
    popover.present({
      ev: myEvent
    });
  }

  presentActionSheet() {
    let button_library = {
      text: this.i18n["LOAD_FROM_LIBRARY"],
      handler: () => {
        console.log('test')
      }
    };
    let button_cancel = {
      text: this.i18n["CANCEL"],
      role: 'cancel'
    }
    let buttons = [button_library,button_cancel];

    let titletext = this.i18n["SELECT_PICTURE"];
    // console.log("titletext",titletext);
    let actionSheet = this.actionSheetCtrl.create({
      title: titletext,
      buttons: buttons
    });
    actionSheet.present();
  }

  presentLoading(content = 'Please wait...') {
    this.loading = this.loadingCtrl.create({
      content: content
    });

    this.loading.present();
  }

  hideLoading(){
    this.loading.dismiss();
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentToast(message, duration = 3000) {
    // console.log('presentToast', message)
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'middle',
      cssClass: 'custom_toast'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
