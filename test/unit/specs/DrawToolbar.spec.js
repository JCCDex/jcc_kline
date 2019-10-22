import DrawToolbar from 'js/DrawToolbar.js';

describe('test DrawToolbar', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    let Toolbar = new DrawToolbar(canvas, ctx);
    it('test DrawToolbar', () => {
        expect(Toolbar).toBeInstanceOf(DrawToolbar)
    })

})


