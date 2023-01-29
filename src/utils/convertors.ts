export const convertintChar = (integer: number) => {
    const character = 'a'.charCodeAt(0);
    return String.fromCharCode(character + (integer - 1));
};

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomHexColorGenerator = () => {
    let resultHexCode = `#`;
    for (let i = 1; i <= 6; i++) {
        const numberOrLetter: 'number' | 'letter' = Math.random() === 0 ? 'number' : 'letter';

    switch (numberOrLetter) {
        case 'number':
            resultHexCode += `${getRandomInt(0, 9)}`;
            break;
        case 'letter':
            resultHexCode += `${convertintChar(getRandomInt(1, 6))}`
            break;
    }
    }
    return resultHexCode;
}

export const averageArrayNumber = (array: number[]) => {
    return array.reduce((accumulator, value) => accumulator + value) / array.length;
}

export const AUSCodeToName = (code: string) => {
    const states = [["New South Wales", "NSW"],
        ["Northern Territory",	"NT"],	
        ["Queensland",	"QL"],
        ["South Australia", "SA"],	
        ["Tasmania", "TS"],
        ["Victoria", "VI"],
        ["Western Australia", "WA"],
        ['Australian Capital Territory', 'ACT']];

        const foundState = states.find((state) => state[1] === code);

    return foundState ? foundState[0] : "";
}

export const USCodeToName = (code: string) => {
    const states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
        ['Canada', 'CA2'],
        ['Mexico', 'MX'],
        ["Alberta", "AB"],
        ["British Columbia", "BC"],
        ["Manitoba", "MB"],
        ["New Brunswick", "NB"],
        ["Newfoundland and Labrador", "NL"],
        ["Northwest Territories", "NT" ],
        ["Nova Scotia", "NS"],
        ["Nunavut", "NU"],
        ["Ontario", "ON"],
        ["Prince Edward Island", "PE"],
        ["Quebec", "QC"],
        ["Saskatchewan", "SK"],
        ["Yukon Territory", "YT"],
        ['Aguascalientes',     'AGU'],
        ['Baja California',    'BCN'],
        ['Baja California Sur', 'BCS'],
        ['Campeche',           'CAM'],
        ['Chiapas',            'CHP'],
        ['Chihuahua',          'CHH'],
        ['Coahuila',           'COA'],
        ['Colima',             'COL'],
        ['Mexico City',        'CMX'],
        ['Durango',            'DUR'],
        ['Guanajuato',         'GUA'],
        ['Guerrero',           'GRO'],
        ['Hidalgo',            'HID'],
        ['Jalisco',            'JAL'],
        ['México',             'MEX'],
        ['Michoacán',          'MIC'],
        ['Morelos',            'MOR'],
        ['Nayarit',            'NAY'],
        ['Nuevo León',         'NLE'],
        ['Oaxaca',             'OAX'],
        ['Puebla',             'PUE'],
        ['Querétaro',          'QUE'],
        ['Quintana Roo',       'ROO'],
        ['San Luis Potosí',    'SLP'],
        ['Sinaloa',            'SIN'],
        ['Sonora',             'SON'],
        ['Tabasco',            'TAB'],
        ['Tamaulipas',         'TAM'],
        ['Tlaxcala',           'TLA'],
        ['Veracruz',           'VER'],
        ['Yucatán',            'YUC'],
        ['Zacatecas',          'ZAC']
    ];
    const stateCode = code.includes("-") ? code.split("-")[1].toUpperCase() : code.includes("_") ? code.split("_")[1].toUpperCase() : code;
    console.log(code, stateCode);
    const foundState = states.find((stateArray) => stateArray[1] === stateCode);

    return foundState ? foundState[0] : "";
}