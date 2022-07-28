import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/compat/firestore";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import * as fromApp from "src/app/app.reducer";
import * as productActions from "./products.actions";
import { Iphone } from '../../models/iphone.model';
import { Accessoir } from "../../models/accessoirs.model";
import { Offer } from "../../models/offers.model";
import { iPhones } from "../../firestore.collections";
import { FormControl, FormGroup, Validators } from "@angular/forms";



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

  // getIphoneEditStarted = createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(productActions.getIPhonesEditStarted),
  //     withLatestFrom(this.store.select('product')),
  //     switchMap(([actions,offerstate]) =>{
  //       let form =this.db.collection(iPhones).doc(actions.payload).valueChanges().subscribe(
  //         fetchedproduct => {
  //           return new FormGroup({
  //             name: new FormControl(fetchedproduct['name'],[Validators.required]),
  //             model: new FormControl(fetchedproduct['model'],[Validators.required]),
  //             price: new FormControl(fetchedproduct['price'],[Validators.required]),
  //             imagesource: new FormControl(fetchedproduct['imagesource'],[Validators.required]),
  //             color: new FormControl(fetchedproduct['color'],[Validators.required]),
  //             screensize: new FormControl(fetchedproduct['screensize'],[Validators.required]),
  //             sku: new FormControl(fetchedproduct['sku'],[Validators.required]),
  //             description: new FormControl(fetchedproduct['ndescriptioname'],[Validators.required]),
  //           })
  //         }
  //       )
  //       return of(productActions.getIPhonesStarted())
  //     })
  //   )
  // })


  getIphonesUpdate =createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.getIPhonesUpdateStarted),
      withLatestFrom(this.store.select('product')),
      switchMap(([action,offerState])=>{
        this.db.collection(iPhones).doc(action.id).update(
          {
              name:action.payload.value.name,
              price:action.payload.value.price,
              imagesource:action.payload.value.imagesource,
              color:action.payload.value.color,
              screensize:action.payload.value.screensize,
              description:action.payload.value.description,
              sku:action.payload.value.sku,
              model:action.payload.value.model
          }
          )
        return of(productActions.getIPhonesStarted())
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

  // getAccessoirsUpdate =createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(productActions.getAccessoirsStarted),
  //     withLatestFrom(this.store.select('product')),
  //     switchMap(([action,offerState])=>{
  //       return this.db.collection('Accessoirs').snapshotChanges().pipe(
  //         map((documents) =>{
  //           var Accessoirs = documents.map((document) => ({
  //             id:document.payload.doc.id,
  //             ...(document.payload.doc.data() as Accessoir)
  //           }))
  //           return productActions.getAccessoirsSuccess({payload:Accessoirs})
  //         }),
  //         catchError(async (error) => {
  //           return productActions.getAccessoirsFail({ payload: error })
  //         })
  //       )
  //     })
  //   )
  // })


  getOffers = createEffect(() => {
    return this.actions.pipe(
      ofType(productActions.getOffersStarted),
      withLatestFrom(this.store.select('product')),
      switchMap(([action, productsState]) => {
        if (productsState.offersLoaded) {
          return of(productActions.getOffersSuccess({ payload: productsState.offers }))
        }
        else {
          return this.db.collection('Offers').snapshotChanges().pipe(
            map((documents) => {
              var offers: Offer[] = [];
              documents.forEach(document => {
                var offer = document.payload.doc.data() as Offer;
                offer.id = document.payload.doc.id;
                offer.iphone = productsState.iphones?.find(x => x.id == offer.iphone?.id);
                offer.accessoir = productsState.accessoirs?.find(x => x.id == offer.accessoir?.id);
                offers.push(offer);
              });
              return productActions.getOffersSuccess({ payload: offers })
            }),
            catchError(async (error) => {
              return productActions.getOffersFail({ payload: error })
            })
          )
        }
      })
    )
  })


  // getOffersUpdate =createEffect(() => {
  //   return this.actions.pipe(
  //     ofType(productActions.getOffersStarted),
  //     withLatestFrom(this.store.select('product')),
  //     switchMap(([action,offerState])=>{
  //       return this.db.collection('Offers').snapshotChanges().pipe(
  //         map((documents) =>{
  //           var Offers = documents.map((document) => ({
  //             id:document.payload.doc.id,
  //             ...(document.payload.doc.data() as Offer)
  //           }))
  //           return productActions.getOffersSuccess({payload:Offers})
  //         }),
  //         catchError(async (error) => {
  //           return productActions.getOffersFail({ payload: error })
  //         })
  //       )
  //     })
  //   )
  // })

   













}