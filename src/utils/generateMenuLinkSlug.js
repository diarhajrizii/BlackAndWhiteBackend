/**
 * @param details { Record<string, unknown> } - menu link details
 * @param title { string | undefined } - menu link title
 * @returns string
 * @description - Generates slug for menu link based on link type
 */
const generateMenuLinkSlug = (details, title) => {
  const { link_type, sport_slug, event_id } = details;

  let slug = '';

  switch (link_type) {
    case 'sport':
      slug = sport_slug;

      return slug;

    case 'event':
      slug = event_id;

      return slug;

    default:
      slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "_");

      return slug;
  }
}

module.exports = {
  generateMenuLinkSlug,
}
