/**
 *
 * @param slug {string}
 * @return string
 * @desc
 * Returns sport code by slug. Example: getSportCodeBySlug('soccer') -> 'FB'
 */
const getSportCodeBySlug = (slug) => {
  const sportCodes = {
    'soccer': 'FB',
    'horse_racing': 'HR',
    'dog_racing': 'DR',
    'all': 'SF',
  };

  return sportCodes[slug] ? sportCodes[slug] : slug.slice(0, 2).toUpperCase();
}

module.exports = getSportCodeBySlug;
