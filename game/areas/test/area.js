// area.js

var Area = require('../../../src/schema/room').Area;

var TestArea = new Area({
    title: "Test Area 1",
    suggested_range: '1-99'
});

exports.area = TestArea;