export default class StoreHelper {
    static findAllProducts = () => {
        var products = [
            { id: 1, name: 'Product1', price: 120 },
            { id: 2, name: 'Product2', price: 1202 },
            { id: 3, name: 'Product3', price: 89 },
            { id: 4, name: 'Product4', price: 120 },
            { id: 5, name: 'Product5', price: 4850 },
            { id: 6, name: 'Product6', price: 120 },
            { id: 7, name: 'Product7', price: 2456 },
            { id: 8, name: 'Product8', price: 767 },
            { id: 9, name: 'Product9', price: 5454 },
            { id: 10, name: 'Product10', price: 42 },
            { id: 11, name: 'Product11', price: 122420 },
            { id: 12, name: 'Product12', price: 24 },
            { id: 13, name: 'Product13', price: 122420 },
            { id: 14, name: 'Product14', price: 24 },
            { id: 15, name: 'Product15', price: 120 },
            { id: 16, name: 'Product16', price: 24 },
            { id: 17, name: 'Product17', price: 24 },
        ];
        return products;
    }

    static findAllJourneys = () => {
        var journeys = [
            { id: 1, journeyName: 'Hiroshima → Nagasaki', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 2, journeyName: 'Hiroshima → 長崎', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 3, journeyName: '神戸か大阪まで旅行', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 4, journeyName: 'Hiroshima → 東京', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 5, journeyName: 'Hiroshima → 埼玉', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 6, journeyName: 'Hiroshima → 北海道', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 7, journeyName: 'Hiroshima → 韓国', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 8, journeyName: 'TP Ho chi minh → Ha noi', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 9, journeyName: 'Hiroshima → 神奈川', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 10, journeyName: 'Hiroshima → 名古屋', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 11, journeyName: 'Hiroshima → 熊本', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 12, journeyName: '熊本 → 富山', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 13, journeyName: '千葉 → 青森', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 14, journeyName: '青森 → 岡崎', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 15, journeyName: '福山 → 山口', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 16, journeyName: '沖縄 → 京都', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 17, journeyName: 'Nagasaki → Viet nam', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },
            { id: 18, journeyName: 'Viet name → Singapore', estimateStartTime: 1494575160675, estimateEndTime: 1494575176946 },

        ];
        return journeys;
    }
}