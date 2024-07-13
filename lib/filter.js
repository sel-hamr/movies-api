export const createFilter = (query) => {
  const filter = {};

  if (query.id) {
    filter.id = Number(query.id);
  }

  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" }; // case-insensitive regex match
  }

  if (query.type) {
    filter.type = query.type;
  }

  if (query.language) {
    filter.language = query.language;
  }

  if (query.genres) {
    filter.genres = { $in: query.genres.split(",") };
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.runtime) {
    filter.runtime = Number(query.runtime);
  }

  if (query.premiered) {
    filter.premiered = new Date(query.premiered);
  }

  if (query.officialSite) {
    filter.officialSite = query.officialSite;
  }

  if (query.scheduleTime) {
    filter["schedule.time"] = query.scheduleTime;
  }

  if (query.scheduleDays) {
    filter["schedule.days"] = { $in: query.scheduleDays.split(",") };
  }

  if (query.ratingAverage) {
    filter["rating.average"] = Number(query.ratingAverage);
  }

  if (query.weight) {
    filter.weight = Number(query.weight);
  }

  if (query.networkId) {
    filter["network.id"] = Number(query.networkId);
  }

  if (query.networkName) {
    filter["network.name"] = query.networkName;
  }

  if (query.networkCountryName) {
    filter["network.country.name"] = query.networkCountryName;
  }

  if (query.networkCountryCode) {
    filter["network.country.code"] = query.networkCountryCode;
  }

  if (query.networkCountryTimezone) {
    filter["network.country.timezone"] = query.networkCountryTimezone;
  }

  if (query.externalsTvrage) {
    filter["externals.tvrage"] = Number(query.externalsTvrage);
  }

  if (query.externalsThetvdb) {
    filter["externals.thetvdb"] = Number(query.externalsThetvdb);
  }

  if (query.externalsImdb) {
    filter["externals.imdb"] = query.externalsImdb;
  }

  if (query.imageMedium) {
    filter["image.medium"] = query.imageMedium;
  }

  if (query.imageOriginal) {
    filter["image.original"] = query.imageOriginal;
  }

  if (query.summary) {
    filter.summary = { $regex: query.summary, $options: "i" };
  }

  if (query.updated) {
    filter.updated = Number(query.updated);
  }

  if (query.linksSelfHref) {
    filter["_links.self.href"] = query.linksSelfHref;
  }

  if (query.linksPreviousEpisodeHref) {
    filter["_links.previousepisode.href"] = query.linksPreviousEpisodeHref;
  }

  return filter;
};
