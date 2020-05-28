import { Exporter, Options } from 'mat-table-exporter';

export class CustomExporter implements Exporter<Options> {

  export(rows: Array<any>, options?: Options) {
    console.log(rows);
  }

}
