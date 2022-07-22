import { NgModule } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatTabsModule } from "@angular/material/tabs"
import {MatCardModule} from "@angular/material/card"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"


@NgModule({
    imports:[
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports:[
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule {}
