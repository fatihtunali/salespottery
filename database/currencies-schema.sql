-- Currencies and Exchange Rates Schema for SalesPottery

-- Currencies table
CREATE TABLE IF NOT EXISTS currencies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(3) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_code (code),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exchange rates table (base currency is EUR)
CREATE TABLE IF NOT EXISTS exchange_rates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  currency_code VARCHAR(3) NOT NULL,
  rate DECIMAL(10, 6) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uk_currency (currency_code),
  FOREIGN KEY (currency_code) REFERENCES currencies(code) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- VAT rates by country
CREATE TABLE IF NOT EXISTS vat_rates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  standard_rate DECIMAL(5, 2) NOT NULL,
  reduced_rate DECIMAL(5, 2) DEFAULT NULL,
  is_eu BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uk_country (country_code),
  INDEX idx_is_eu (is_eu)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert supported currencies
INSERT INTO currencies (code, name, symbol, is_active, display_order) VALUES
('EUR', 'Euro', '€', TRUE, 1),
('USD', 'US Dollar', '$', TRUE, 2),
('GBP', 'British Pound', '£', TRUE, 3),
('TRY', 'Turkish Lira', '₺', TRUE, 4)
ON DUPLICATE KEY UPDATE name = VALUES(name), symbol = VALUES(symbol);

-- Insert initial exchange rates (base EUR = 1.00)
INSERT INTO exchange_rates (currency_code, rate) VALUES
('EUR', 1.000000),
('USD', 1.080000),
('GBP', 0.860000),
('TRY', 37.500000)
ON DUPLICATE KEY UPDATE rate = VALUES(rate);

-- Insert EU VAT rates for major countries
INSERT INTO vat_rates (country_code, country_name, standard_rate, reduced_rate, is_eu) VALUES
('AT', 'Austria', 20.00, 10.00, TRUE),
('BE', 'Belgium', 21.00, 6.00, TRUE),
('BG', 'Bulgaria', 20.00, 9.00, TRUE),
('HR', 'Croatia', 25.00, 13.00, TRUE),
('CY', 'Cyprus', 19.00, 5.00, TRUE),
('CZ', 'Czech Republic', 21.00, 10.00, TRUE),
('DK', 'Denmark', 25.00, NULL, TRUE),
('EE', 'Estonia', 20.00, 9.00, TRUE),
('FI', 'Finland', 24.00, 14.00, TRUE),
('FR', 'France', 20.00, 5.50, TRUE),
('DE', 'Germany', 19.00, 7.00, TRUE),
('GR', 'Greece', 24.00, 6.00, TRUE),
('HU', 'Hungary', 27.00, 5.00, TRUE),
('IE', 'Ireland', 23.00, 9.00, TRUE),
('IT', 'Italy', 22.00, 10.00, TRUE),
('LV', 'Latvia', 21.00, 12.00, TRUE),
('LT', 'Lithuania', 21.00, 9.00, TRUE),
('LU', 'Luxembourg', 17.00, 8.00, TRUE),
('MT', 'Malta', 18.00, 7.00, TRUE),
('NL', 'Netherlands', 21.00, 9.00, TRUE),
('PL', 'Poland', 23.00, 8.00, TRUE),
('PT', 'Portugal', 23.00, 6.00, TRUE),
('RO', 'Romania', 19.00, 9.00, TRUE),
('SK', 'Slovakia', 20.00, 10.00, TRUE),
('SI', 'Slovenia', 22.00, 9.50, TRUE),
('ES', 'Spain', 21.00, 10.00, TRUE),
('SE', 'Sweden', 25.00, 12.00, TRUE),
('TR', 'Turkey', 20.00, 10.00, FALSE),
('GB', 'United Kingdom', 20.00, 5.00, FALSE),
('US', 'United States', 0.00, NULL, FALSE)
ON DUPLICATE KEY UPDATE
  country_name = VALUES(country_name),
  standard_rate = VALUES(standard_rate),
  reduced_rate = VALUES(reduced_rate);
