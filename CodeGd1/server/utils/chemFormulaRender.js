const renderChemText = (input) => {
  if (!input) return '';

  let text = String(input).trim();

  text = text.replace(/\$/g, '');

  text = text.replace(/\\rightarrow/g, '→');
  text = text.replace(/\\rightleftharpoons/g, '⇌');
  text = text.replace(/\\downarrow/g, '↓');
  text = text.replace(/\\uparrow/g, '↑');
  text = text.replace(/\\text\{([^}]+)\}/g, '$1');
  text = text.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)');

  text = text.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
  text = text.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');

  text = text.replace(/_([0-9]+)/g, '<sub>$1</sub>');
  text = text.replace(/\^([0-9+\-]+)/g, '<sup>$1</sup>');

  return text.trim();
};

module.exports = {
  renderChemText,
};