import calendarModule = require("nativescript-telerik-ui/calendar");
import observableModule = require("data/observable");
import frameModule = require("ui/frame");

export class ViewModel extends observableModule.Observable{
    private _selectionInfo;
	constructor(){
		super();
        this._selectionInfo = {
            options: ["None", "Single", "Multiple", "Range"],
            index: 0
        };
	}
	
	set selectionMode(value: calendarModule.CalendarSelectionMode){
		this.set("SelectionMode", value);
	}
	
	get selectionMode() : calendarModule.CalendarSelectionMode{
		return this.get("SelectionMode");
	}
	
	public setSelectionMode(selectionMode : string){
		this.selectionMode = selectionMode;
	}
    
     public updateSelectionMode() {
        var index: number = this._selectionInfo.index;
        if(index == 0) {
           this.selectionMode = calendarModule.CalendarSelectionMode.None;
        } else if (index == 1) {
            this.selectionMode = calendarModule.CalendarSelectionMode.Single;
        } else if (index == 2) {
            this.selectionMode = calendarModule.CalendarSelectionMode.Multiple;
        } else {
             this.selectionMode = calendarModule.CalendarSelectionMode.Range;
        }
    }
    
    public onOptionsTapped() {
        var navigationEntry = {
            moduleName: "./calendar/options-menu/options",
            context: this._selectionInfo,
            animated: true
        };
        
        frameModule.topmost().navigate(navigationEntry);
    }
}