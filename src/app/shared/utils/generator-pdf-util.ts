import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class GeneratorPdfUtil {

  public static buildTableBody(data, columns: string[]) {
    const body = [];
    const columnRow = [];

    for (const key in columns) {
      columnRow.push({
        text: columns[key],
        border: [false, false, false, false],
        bold: true,
        margin: [0, 0, 0, 2],
        fillColor: '#eeeeee'
      });
    }

    body.push(columnRow);

    data.forEach(function (row) {
      const dataRow = [];
      for (const key in columns) {
        dataRow.push({text: row[key], border: [false, true, false, false]});
      }
      body.push(dataRow);
    });
    return body;
  }

  public static table(data, columns: string[]) {
    return {
      style: 'table',
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns),
        style: 'tableHeader'
      }
    };
  }

  public static documentPdf(title: string, subTitle: string, columns: string[], data: any) {
    const dd = {
      content: [
        {
          text: title, style: 'title'
        },
        {
          text: subTitle, style: 'subTitle'
        },
        this.table(data, columns),
      ],
      styles: {
        title: {
          fontSize: 13,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        subTitle: {
          fontSize: 13,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 15]
        },
        table: {
          fontSize: 12
        }
      },
      pageOrientation: 'landscape',
      pageMargins: [20, 30, 20, 30],
    };
    return dd;
  }

  public static printPdf(title: string, subTitle: string, columns: string[], data: any) {
    const doc = this.documentPdf(title, subTitle, columns, data);
    pdfMake.createPdf(doc).open();
  }
}
