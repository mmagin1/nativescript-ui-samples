import {ObservableArray} from "data/observable-array";
import listViewModule = require("../../nativescript-telerik-ui/listview");
import timer = require("timer");

var posts = require("../swipe-execute/posts.json")
var application = require("application");

export class ViewModel {

    private _items: ObservableArray<DataItem>;
    private _numberOfAddedItems;
    
    constructor() {
        this.initDataItems();
    }

    get dataItems() {
        return this._items;
    }
    // >> listview-load-on-demand-handler
    public onLoadMoreItemsRequested(args: listViewModule.ListViewEventData) {
        var that = new WeakRef(this);
        timer.setTimeout(function() {
            var initialNumberOfItems = that.get()._numberOfAddedItems;
            for (var i = that.get()._numberOfAddedItems-1; i < initialNumberOfItems + 2; i++) {
                if (i > posts.names.length-1){
                    break;
                }
                that.get()._items.push(new DataItem(posts.names[i], posts.titles[i], posts.text[i],"res://"+ posts.images[i]));
                that.get()._numberOfAddedItems++;
            }
            var listView = args.object;
            listView.notifyLoadOnDemandFinished();
        }, 1000);
        args.returnValue = true;
    }
    // << listview-load-on-demand-handler

    private initDataItems() {
        this._items = new ObservableArray<DataItem>();
        this._numberOfAddedItems = 0;
        
        for (var i = 0; i < posts.names.length-15; i++) {
            this._numberOfAddedItems++;
            if (application.android){
                  this._items.push(new DataItem(posts.names[i], posts.titles[i], posts.text[i],"res://"+ posts.images[i].toLowerCase()));
            }
            else{
                 this._items.push(new DataItem(posts.names[i], posts.titles[i], posts.text[i],"res://"+ posts.images[i]));
            }
          
        }
    }
}

export class DataItem {
    public name;
    public title;
    public text;
    public image;

    constructor(name: string, title: string, text:string, image:string) {
        this.name = name;
        this.text = text;
        this.title = title;
        this.image = image;
    }
}
