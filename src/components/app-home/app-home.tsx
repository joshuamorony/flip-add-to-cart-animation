import { Component, State, Element, h } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
})
export class AppHome {
  @Element() hostElement: HTMLElement;
  @State() cards: string[] = ["one", "two", "three"];
  public cartButton: HTMLElement;

  componentDidLoad() {
    this.cartButton = this.hostElement.querySelector(".cart-button");
  }

  addToCart(ev) {
    const flyToElement = ev.target.closest("app-fly-to");
    flyToElement.trigger(this.cartButton);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
          <ion-buttons slot="end">
            <ion-button class="cart-button">
              <ion-icon name="cart"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        {this.cards.map((card) => (
          <app-fly-to>
            <div class="product-card">
              <img src="https://images.unsplash.com/photo-1586776894492-1f547b444b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" />
              <p>
                Keep close to Nature's heart... and break clear away, once in
                awhile, and climb a mountain or spend a week in the woods. Wash
                your spirit clean.
              </p>
              <ion-button
                expand="full"
                onClick={(ev) => {
                  this.addToCart(ev);
                }}
              >
                Add to Cart
              </ion-button>
            </div>
          </app-fly-to>
        ))}
      </ion-content>,
    ];
  }
}
