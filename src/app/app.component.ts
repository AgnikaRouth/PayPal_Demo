import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'payment-demo';
  amount = 40;
  id: number = 0;
  showId: Boolean = false;
  status: string = '';

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  ngOnInit(): void {
    // this.amount = this.payment.totalAmount;
    console.log(window.paypal);
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toString(),
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              this.showId = true;
              console.log('completed status', details);
              this.id = details.id;
              this.status = details.status;
              // this.router.navigate(['confirm']);
            }
          });
        },
        onError: (error: any) => {
          console.log(error);
        },
      })
      .render(this.paymentRef.nativeElement);
  }

  // cancel() {
  //   this.router.navigate(['cart']);
  // }
}
