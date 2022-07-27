import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/compat/firestore";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from "@ngrx/store";
import { catchError, map, of, subscribeOn, Subscription, switchMap, withLatestFrom } from "rxjs";
import * as fromApp from "src/app/app.reducer";
import * as productActions from "./products.actions";
import { Iphone } from '../../models/iphone.model';
import { Accessoir } from "../../models/accessoirs.model";
import { Offer } from "../../models/offers.model";



@Injectable()
export class ProductEffects {


    constructor(private db: AngularFirestore,
        private actions: Actions,
        private store: Store<fromApp.State>
      ) { }
    

    getIphones = createEffect(() => {
        return this.actions.pipe(
            ofType(productActions.getIPhonesStarted),
            withLatestFrom(this.store.select('product')),
            switchMap(([action,iphoneState]) => {
                if (iphoneState.iphonesLoaded){
                    return of(productActions.getIPhonesSuccess({payload:iphoneState.iphones}))
                }
                else{
                    return this.db.collection('iPhones').snapshotChanges().pipe(
                        map((documents) => {
                          var iPhones = documents.map((document) => (
                            {
                              id: document.payload.doc.id,
                              ...(document.payload.doc.data() as Iphone)
                            }
                          ));
                          return productActions.getIPhonesSuccess({ payload: iPhones })
                        }),
                        catchError(async (error) => {
                          return productActions.getIPhonesFail({ payload: error })
                        })
                      )
                    }
                  })
                )
              })
  

    getAccessoirs = createEffect(() => {
      return this.actions.pipe(
          ofType(productActions.getAccessoirsStarted),
          withLatestFrom(this.store.select('product')),
          switchMap(([action,accessoirState]) => {
              if (accessoirState.accessoirsLoaded){
                  return of(productActions.getAccessoirsSuccess({payload:accessoirState.accessoirs}))
              }
              else{
                  return this.db.collection('Accessoirs').snapshotChanges().pipe(
                      map((documents) => {
                        var Accessoirs = documents.map((document) => (
                          {
                            id: document.payload.doc.id,
                            ...(document.payload.doc.data() as Accessoir)
                          }
                        ));
                        return productActions.getAccessoirsSuccess({ payload: Accessoirs })
                      }),
                      catchError(async (error) => {
                        return productActions.getAccessoirsFail({ payload: error })
                      })
                    )
                  }
                })
              )
            })


    getOffers = createEffect(() => {
      return this.actions.pipe(
          ofType(productActions.getOffersStarted),
          withLatestFrom(this.store.select('product')),
          switchMap(([action,offerState]) => {
              if (offerState.offersLoaded){
                  return of(productActions.getOffersSuccess({payload:offerState.offers}))
              }
              else{
                  return this.db.collection('Offers').snapshotChanges().pipe(
                      map((documents) => {
                        var Offers = documents.map((document) => (
                          {
                            id: document.payload.doc.id,
                            ...(document.payload.doc.data() as Offer)
                          }
                        ));
                        return productActions.getOffersSuccess({ payload: Offers })
                      }),
                      catchError(async (error) => {
                        return productActions.getOffersFail({ payload: error })
                      })
                    )
                  }
                })
              )
            })

   













}