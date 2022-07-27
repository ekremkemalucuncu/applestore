import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import * as fromApp from "src/app/app.reducer";
import * as phonesActions from "./phones.actions";
import { Iphone } from '../../models/iphone.model';

@Injectable()
export class PhonesEffects {

  getPhones = createEffect(() => {
    return this.actions.pipe(
      ofType(phonesActions.getPhonesSuccess),
      withLatestFrom(this.store.select('phones')),
      switchMap(([action, phoneState]) => {
        if (phoneState.phonesLoaded) {
          return of(phonesActions.getPhonesSuccess({ payload: phoneState.phones }))
        } else {
          return this.db.collection('iPhones').snapshotChanges().pipe(
            map((documents) => {
              var iPhones = documents.map((document) => (
                {
                  id: document.payload.doc.id,
                  ...(document.payload.doc.data() as Iphone)
                }
              ));
              return phonesActions.getPhonesSuccess({ payload: iPhones })
            }),
            catchError(async (error) => {
              return phonesActions.getPhonesFails({ payload: error })
            })
          )
        }
      })
    )
  })

  constructor(private db: AngularFirestore,
    private actions: Actions,
    private store: Store<fromApp.State>
  ) { }
}
