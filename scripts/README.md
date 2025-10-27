# Database Scripts

This directory contains utility scripts for managing the database.

## Available Scripts

### load-test-data.sh
Loads sample test data into the database for development and testing.

```bash
bash scripts/load-test-data.sh
```

### clear-test-data.sh
Removes all test data from the database.

```bash
bash scripts/clear-test-data.sh
```

## Important Notes

- These scripts contain database credentials and should **NEVER** be committed to git
- They are included in `.gitignore`
- Use these scripts only in development environments
- For production, use proper migration tools

## Creating Your Own Scripts

If you create additional scripts with credentials:
1. Add them to this directory
2. Ensure they are listed in `.gitignore`
3. Document them here
