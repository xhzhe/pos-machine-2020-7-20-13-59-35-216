function printReceipt(barcodes) {
    let barList = decode(barcodes);
    console.log(getReceipt(barList));
}

function getReceipt(barList) {
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

function decode(barcodes) {
    let data = loadData();
    let dataMap = new Map();
    for (let d of data) {
        dataMap.set(d.barcode, d);
    }
    let barcodeMap = new Map();
    for (let barcode of barcodes) {
        if (!barcodeMap.has(barcode)) {
            barcodeMap.set(barcode, 1);
        } else {
            barcodeMap.set(barcode, barcodeMap.get(barcode) + 1);
        }
    }
    for (let key of barcodeMap) {
        if (!dataMap.has(key)) {
            barcodeMap.delete(key);
        }
    }
    return getBarList(barcodeMap, dataMap);
}

function getBarList(barcodeMap, dataMap) {
    let barList = [];
    for (let [key, value] of barcodeMap) {
        let bar = {};
        let data = dataMap.get(key);
        bar.name = data.name;
        bar.quantity = value;
        bar.unitPrice = data.price;
        bar.subtotal = bar.quantity * bar.unitPrice;
        barList.push(bar);
    }
    return barList;
}

function loadData() {
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