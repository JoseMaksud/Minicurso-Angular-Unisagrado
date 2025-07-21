import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-uci-home',
  imports: [CommonModule],
  template: `
    <div class="uic-home-component">
      <div class="home-logo-icon">
        <img style="max-width: 220px;" src="logo-icon.jpg" alt="">  
      </div>
      <div class="home-inicio">
        <h1 style="margin: 0"><span style="color: red;">Uni</span><span>sagrado</span></h1>
        <small>Cadastro interno</small>
      </div>
      <div class="line-logo"></div>
    </div>
    <div class="outro-component" style="display: flex; justify-content: center">
      <span>outras informações e secções</span>
    </div>
  `,
  styles: `
    .uic-home-component{
      width: 100%;
    }

    .home-logo-icon{
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }
    
    .line-logo{
      background-color: red;
      height: 1px;
      width: 100%;
      opacity: 0.5;
      margin-top: 25px;
    }

    .home-inicio{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .home-inicio  span{
      font-size: 46px;
      letter-spacing: 3px;
    }

    .home-inicio > small{
      font-size: 24px;
    }
  `
})
export class UciHomeComponent {

}
