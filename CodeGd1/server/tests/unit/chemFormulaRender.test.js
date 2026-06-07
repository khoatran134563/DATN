const { renderChemText } = require('../../utils/chemFormulaRender');

describe('Unit Test - Chemical Formula Text Rendering', () => {
  test('Render chỉ số dưới trong công thức H2O', () => {
    expect(renderChemText('$H_2O$')).toBe('H<sub>2</sub>O');
  });

  test('Render chỉ số dưới trong công thức CO3', () => {
    expect(renderChemText('$CO_3$')).toBe('CO<sub>3</sub>');
  });

  test('Render ion CO3 2-', () => {
    expect(renderChemText('$CO_3^{2-}$')).toBe('CO<sub>3</sub><sup>2-</sup>');
  });

  test('Render ion H+', () => {
    expect(renderChemText('$H^+$')).toBe('H<sup>+</sup>');
  });

  test('Render ion OH-', () => {
    expect(renderChemText('$OH^-$')).toBe('OH<sup>-</sup>');
  });

  test('Render phương trình có mũi tên một chiều', () => {
    expect(renderChemText('$N_2O_4 \\rightarrow 2NO_2$')).toBe(
      'N<sub>2</sub>O<sub>4</sub> → 2NO<sub>2</sub>'
    );
  });

  test('Render phương trình thuận nghịch', () => {
    expect(renderChemText('$N_2O_4 \\rightleftharpoons 2NO_2$')).toBe(
      'N<sub>2</sub>O<sub>4</sub> ⇌ 2NO<sub>2</sub>'
    );
  });

  test('Render ký hiệu kết tủa', () => {
    expect(renderChemText('$BaSO_4 \\downarrow$')).toBe('BaSO<sub>4</sub> ↓');
  });

  test('Render ký hiệu khí bay lên', () => {
    expect(renderChemText('$CO_2 \\uparrow$')).toBe('CO<sub>2</sub> ↑');
  });

  test('Render text trong LaTeX', () => {
    expect(renderChemText('\\text{M}')).toBe('M');
  });

  test('Render phân số LaTeX', () => {
    expect(renderChemText('\\frac{0,2}{0,2}')).toBe('(0,2)/(0,2)');
  });

  test('Chuỗi rỗng trả về chuỗi rỗng', () => {
    expect(renderChemText('')).toBe('');
  });
});