module.exports = {
 	apps: [
		{
			name: "pm2 name",
			script: "./index.js",
			env: {
				"NODE_ENV": "production"
			}
		}
	]
};
