.PHONY: clean
clean:
	rm -rf dist

dist: clean node_modules
	yarn build
	cp LICENSE dist
	cp package.json dist
	cp README.md dist

node_modules: .yarnrc.yml package.json yarn.lock
	yarn install
