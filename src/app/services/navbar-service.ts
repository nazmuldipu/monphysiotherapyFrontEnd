import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
    screenWidth: number
    private sideNavBarCollapse = false;

    constructor() { 
        this.screenWidth = window.screen.width
        if( this.screenWidth < 768 ){
            this.sideNavBarCollapse = true;
        }
    }

    getSideNavBarCollapse(): boolean {
        return this.sideNavBarCollapse;
    }

    setSideNavBarCollapse() {
        this.sideNavBarCollapse = !this.sideNavBarCollapse;
    }

    collapseNavber(){
        if(this.screenWidth < 768){
            this.sideNavBarCollapse = true;
        }
    }
}
