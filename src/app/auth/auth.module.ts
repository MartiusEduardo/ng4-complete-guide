import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: AuthComponent}
        ])
    ],
    providers: [],
    exports: [
        AuthComponent
    ]
})
export class AuthModule {}