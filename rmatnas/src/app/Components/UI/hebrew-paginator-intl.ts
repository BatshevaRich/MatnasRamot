import { MatPaginatorIntl } from '@angular/material/paginator';

const hebrewRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 מתוך ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} מתוך ${length}`;
};

export function getHebrewPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'מספר פרטים בעמוד: ';
  paginatorIntl.nextPageLabel = 'עמוד הבא';
  paginatorIntl.previousPageLabel = 'עמוד קודם';
  paginatorIntl.getRangeLabel = hebrewRangeLabel;
  return paginatorIntl;
}
