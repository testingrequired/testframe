export default function <T>(xs: Array<any>, key: string): { [key: string]: T } {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
