import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import * as fromApp from 'src/app/app.reducer';
import * as productActions from './products.actions';
import { Iphone } from '../../models/iphone.model';
import { Accessoir } from '../../models/accessoirs.model';
import { Offer } from '../../models/offers.model';
import { Router } from '@angular/router';
@Injectable()
export class ProductEffects {
  constructor(
    private db: AngularFirestore,
    private actions: Actions,
    private store: Store<fromApp.State>,
    private router: Router
  ) {}

  getIphones = createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.getIPhonesStarted),
      withLatestFrom(this.store.select('product')),
      switchMap(([action, iphoneState]) => {
        if (iphoneState.iphonesLoaded) {
          return of(
            productActions.getIPhonesSuccess({ payload: iphoneState.iphones })
          );
        } else {
          return this.db
            .collection('iPhones')
            .snapshotChanges()
            .pipe(
              map((documents) => {
                var iPhones = documents.map((document) => ({
                  id: document.payload.doc.id,
                  ...(document.payload.doc.data() as Iphone),
                }));
                return productActions.getIPhonesSuccess({ payload: iPhones });
              }),
              catchError(async (error) => {
                return productActions.getIPhonesFail({ payload: error });
              })
            );
        }
      })
    );
  });

  updateIphone = createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.updateIphonesStarted),
      switchMap((action) => {
        return from(
          this.db.collection('iPhones').doc(action.id).update({
            name: action.form.value.name,
            price: action.form.value.price,
            imagesource: action.form.value.imagesource,
            color: action.form.value.color,
            screensize: action.form.value.screensize,
            description: action.form.value.description,
            sku: action.form.value.sku,
            model: action.form.value.model,
          })
        ).pipe(
          map(() => {
            this.router.navigate(['/productmanager'], {
              queryParams: { product: 'iphone' },
            });
            return productActions.updateIphoneSuccess();
          }),
          catchError(async (error) => {
            return productActions.updateIphoneFail(error);
          })
        );
      })
    );
  });

  getAccessoirs = createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.getAccessoirsStarted),
      withLatestFrom(this.store.select('product')),
      switchMap(([action, accessoirState]) => {
        if (accessoirState.accessoirsLoaded) {
          return of(
            productActions.getAccessoirsSuccess({
              payload: accessoirState.accessoirs,
            })
          );
        } else {
          return this.db
            .collection('Accessoirs')
            .snapshotChanges()
            .pipe(
              map((documents) => {
                var Accessoirs = documents.map((document) => ({
                  id: document.payload.doc.id,
                  ...(document.payload.doc.data() as Accessoir),
                }));
                return productActions.getAccessoirsSuccess({
                  payload: Accessoirs,
                });
              }),
              catchError(async (error) => {
                return productActions.getAccessoirsFail({ payload: error });
              })
            );
        }
      })
    );
  });

  updateAccessoir = createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.updateAccessoirStarted),
      switchMap((action) => {
        return from(
          this.db.collection('Accessoirs').doc(action.id).update(action.payload)
        ).pipe(
          map(() => {
            this.router.navigate(['/productmanager', { product: 'accessoir' }]);
            return productActions.updateAccessoirSuccess();
          }),
          catchError(async (error) => {
            return productActions.updateAccessoirFail(error);
          })
        );
      })
    );
  });

  getOffers = createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.getOffersStarted),
      withLatestFrom(this.store.select('product')),
      switchMap(([action, productsState]) => {
        if (productsState.offersLoaded) {
          return of(
            productActions.getOffersSuccess({ payload: productsState.offers })
          );
        } else {
          return this.db
            .collection('Offers')
            .snapshotChanges()
            .pipe(
              map((documents) => {
                var offers: Offer[] = [];
                documents.forEach((document) => {
                  var offer = document.payload.doc.data() as Offer;
                  offer.id = document.payload.doc.id;
                  offer.iphone = productsState.iphones?.find(
                    (x) => x.id == offer.iphone?.id
                  );
                  offer.accessoir = productsState.accessoirs?.find(
                    (x) => x.id == offer.accessoir?.id
                  );
                  offers.push(offer);
                });
                return productActions.getOffersSuccess({ payload: offers });
              }),
              catchError(async (error) => {
                return productActions.getOffersFail({ payload: error });
              })
            );
        }
      })
    );
  });

  deleteIphone = createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.deleteIphoneStarted),
      switchMap((action) => {
        return from(this.db.collection('iPhones').doc(action.id).delete()).pipe(
          map((result) => {
            this.router.navigate(['/productmanager', { product: 'iphone' }]);
            return productActions.deleteIphoneSuccess();
          }),
          catchError(async (error) => {
            console.error({ error: error });
            return productActions.deleteIphoneFail(error);
          })
        );
      })
    );
  });

  deleteAccessoir = createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.deleteAccessoirStarted),
      switchMap((action) => {
        return from(
          this.db.collection('Accessoirs').doc(action.id).delete()
        ).pipe(
          map((result) => {
            this.router.navigate(['/productmanager', { product: 'accessoir' }]);
            return productActions.deleteAccessoirSuccess();
          }),
          catchError(async (error) => {
            console.error({ error: error });
            return productActions.deleteAccessoirFail(error);
          })
        );
      })
    );
  });

  deleteOffer = createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.deleteOfferStarted),
      switchMap((action) => {
        return from(this.db.collection('Offers').doc(action.id).delete()).pipe(
          map((result) => {
            this.router.navigate(['/productmanager', { product: 'offer' }]);
            return productActions.deleteOfferSuccess();
          }),
          catchError(async (error) => {
            console.error({ error: error });
            return productActions.deleteOfferFail(error);
          })
        );
      })
    );
  });
}
