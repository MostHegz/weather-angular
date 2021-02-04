import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ],
    exports: [
        MatAutocompleteModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ]
})
export class MaterialModule{}