import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'calcLevel'
})
export class CalcLevelPipe implements PipeTransform {
transform(value: string): number {
        if(value == 'Faible'){
            return 20;
        } else if (value == 'Moyen'){
            return 50;
        } else if (value == 'Bon'){
            return 80;
        } else if (value == 'Expert'){
            return 100;
        } else {
            return 0;
        }
   }

   // LEVEL : ['Faible' || 'Moyen' || 'Bon' || 'Expert']
   // Utilisation : 
   // {{ str | calcLevel }}
}