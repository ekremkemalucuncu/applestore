import { NgModule } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatTabsModule } from "@angular/material/tabs"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatGridListModule } from "@angular/material/grid-list"
import { MatDividerModule } from "@angular/material/divider"
import { MatTooltipModule } from "@angular/material/tooltip"

@NgModule({
    imports:[
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatDividerModule,
        MatTooltipModule
    ],
    exports:[
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatDividerModule,
        MatTooltipModule
    ]
})
export class MaterialModule {}
