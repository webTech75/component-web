function getSalesTaxRate(store_data) {
    let sales_tax_rate = 0.00;
    if (store_data && store_data.collect_sales_tax) {
        sales_tax_rate = (parseFloat(store_data.override_sales_tax_rate || store_data.default_sales_tax_rate)) * 0.01;
    }
    return sales_tax_rate;
}

function toISOString(date_string) {
    if (date_string === "" || date_string === null || date_string === undefined) {
        return "";
    }
    if (typeof(date_string) === "string" && !date_string.endsWith("Z")) {
      date_string += "Z";
    }
    return new Date(date_string).toISOString();
}

function formattedDate(date_string) {
    if (!date_string) {
        return "";
    }
    if (typeof(date_string) === "string" && !date_string.endsWith("Z")) {
      date_string += "Z";
    }

    let d = new Date(date_string);
    if (d) {
        return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
    }
    else {
        return "";
    }
}

function isCustomCategory(category_id) {
    const custom_category_ids = [7]; // A list because we may have more than one.
    return custom_category_ids.includes(category_id);
}

function translateGrades(grades, grade_translations) {
    grades = grades.slice();
    grades = grades.sort((a, b) => a - b);
    let grade_names = grades.map(grade_id => {
        return grade_translations.find(grade => {return grade.id === grade_id.toString();}).grade;
    });
    return grade_names.join(", ");
}

function translateTrimSize(abbr) {
  const trimSizetranslations = {
    '7': '7 3/4 x 10 1/2',
    '8': '8 x 11',
    '9': '9 x 12',
  }
  return translate(trimSizetranslations, abbr);
}

function translate(translations, abbr) {
  if (Object.keys(translations).includes(abbr)) {
    return translations[abbr];
  }
  return '';
}

function isOnline( isSalable, closeDate ){
    var todayDate = Date.parse( new Date() );
    closeDate = Date.parse( closeDate );

    if( isSalable && todayDate <= closeDate ) {
        return true;
    }
        return false;
}

module.exports = {
    getSalesTaxRate,
    toISOString,
    formattedDate,
    isCustomCategory,
    translateGrades,
    isOnline,
    translateTrimSize,
};
