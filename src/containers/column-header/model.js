export default class HeaderData {

  add(val) {
    const nowValue = this.values || [];
    this.values = nowValue.push(val);
  }
}
