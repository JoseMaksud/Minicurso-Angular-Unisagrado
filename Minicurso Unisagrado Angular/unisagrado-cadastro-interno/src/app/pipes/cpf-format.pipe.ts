import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat'
})
export class CpfFormatPipe implements PipeTransform {

  transform(value: any) {
    if(value) {
      let val = value?.replace(/[.-]/g, '') || '';
      if (val?.length !== 11) {
        return val || '';
      } else {
        return val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
      }
    }else{
      return '';
    }
  }

}
