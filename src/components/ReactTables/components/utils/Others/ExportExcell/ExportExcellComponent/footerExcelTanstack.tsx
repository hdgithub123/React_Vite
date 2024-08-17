import { SumFooter, AverageFooter, CountFooter } from '../../../Footer/FooterColumn'

export function footerExcelTanstack(table) {
  let caculateItem
  const columnsLeafvisible = table.getAllLeafColumns()
  const columnVisibility = table.getState().columnVisibility
  const columnsLeafvisibleFilter = columnsLeafvisible.filter(item => columnVisibility[item.id] !== false);
  const functionSumFooterName = 'SumFooter'
  const functionAverageFooterName = 'AverageFooter'
  const functionCountFooterName = 'CountFooter'
  let footerObject ={}

  columnsLeafvisibleFilter.map(item => {
    let fuctionString = "";
    if (typeof item.columnDef.footer === 'function') {
      fuctionString = item.columnDef.footer.toString()
    }

    if (!fuctionString) {
      caculateItem = ""
    } else {
      if (fuctionString.includes(functionSumFooterName)) {
        caculateItem = "Sum: " + SumFooter(item, table).toString();
      } else if (fuctionString.includes(functionAverageFooterName)) {
        caculateItem = "Average: " + AverageFooter(item, table).toString();
      } else if (fuctionString.includes(functionCountFooterName)) {
        caculateItem = "Count: " + CountFooter(table).toString();
      } else {
        caculateItem = ""
      }
    }

    footerObject = { ...footerObject, [item.id]: caculateItem };
  });
  return footerObject
}
