source "https://rubygems.org"

# Mirrors the gem set GitHub Pages builds with, so local preview matches production.
# Local dev only; GitHub Pages resolves its own gems and ignores this file.
gem "github-pages", group: :jekyll_plugins

# Windows and JRuby do not include zoneinfo files, so bundle the tzinfo-data gem.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Speeds up file watching on Windows for `jekyll serve`.
gem "wdm", "~> 0.1.1", platforms: [:mingw, :x64_mingw, :mswin]
