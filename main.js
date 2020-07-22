function printReceipt(barcodes) {
    let itemList = decodeBarcodes(barcodes);
    console.log(generateRecipt(itemList));
}

function generateRecipt(barList) {
    let receipt = "\n***<store earning no money>Receipt ***\n";
    let sum = 0;
    for (let bar of barList) {
        receipt += "Name: " + bar.name + ", Quantity: " + bar.quantity + ", Unit price: " + bar.unitPrice + " (yuan), Subtotal: " + bar.subtotal + " (yuan)\n";
        sum += bar.subtotal;
    }
    receipt += "----------------------\n";
    receipt += "Total: " + sum + " (yuan)\n"
    receipt += "**********************";
    return receipt;
}

function decodeBarcodes(barcodes) {
    let foodList = loadFoodList();
    let foodMap = new Map();
    for (let food of foodList) {
        foodMap.set(food.barcode, food);
    }
    let barcodeMap = countBarcodes(barcodes);
    barcodeMap = filterNotExistBarcodes(barcodeMap, foodMap);
    return transformToItemList(barcodeMap, foodMap);
}

function filterNotExistBarcodes(barcodeMap, foodMap) {
    for (let key of barcodeMap) {
        if (!foodMap.has(key)) {
            barcodeMap.delete(key);
        }
    }
    return barcodeMap;
}

function countBarcodes(barcodes) {
    let barcodeMap = new Map();
    for (let barcode of barcodes) {
        if (!barcodeMap.has(barcode)) {
            barcodeMap.set(barcode, 1);
        } else {
            barcodeMap.set(barcode, barcodeMap.get(barcode) + 1);
        }
    }
    return barcodeMap;
}

function transformToItemList(barcodeMap, foodMap) {
    let itemList = [];
    for (let [key, value] of barcodeMap) {
        let item = {};
        let food = foodMap.get(key);
        item.name = food.name;
        item.quantity = value;
        item.unitPrice = food.price;
        item.subtotal = item.quantity * item.unitPrice;
        itemList.push(item);
    }
    return itemList;
}

function loadFoodList() {
    return [
        {
            barcode: 'ITEM000000',
            name: 'Coca-Cola',
            price: 3
        },
        {
            barcode: 'ITEM000001',
            name: 'Sprite',
            price: 3
        },
        {
            barcode: 'ITEM000002',
            name: 'Apple',
            price: 5
        },
        {
            barcode: 'ITEM000003',
            name: 'Litchi',
            price: 15
        },
        {
            barcode: 'ITEM000004',
            name: 'Battery',
            price: 2
        },
        {
            barcode: 'ITEM000005',
            name: 'Instant Noodles',
            price: 4
        }
    ]
}

module.exports = {
    printReceipt
};