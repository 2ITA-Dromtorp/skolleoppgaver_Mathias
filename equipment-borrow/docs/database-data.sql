INSERT INTO `User`
  (`firstName`, `lastName`, `username`, `password`, `userType`, `userRole`)
VALUES
  ('Mathias', 'Aarskog', 'mathias', '$2a$10$kON7v6ccRG0IzvLKdIfsRuu6yhdrjpPQY7cDgOa6jaWNr6.7vqrSq', 'employee', 'admin')
;

INSERT INTO `Product`
  (`name`, `description`, `imageUrl`, `unitPrice`, `quantityAvailable`)
VALUES
   ('Stasjonær PC','En skikkelig bra Gaming PC', '/images/desktop.jpg', '28900.00', '3')
  ,('Laptop','En ok jobbmaskin', '/images/laptop.jpg', '14900.00', '5')
  ,('Projektor','Film er best på stor skjerm', '/images/projector.jpg', '24900.00', '2')
  ,('Trådløst AP','Få den nye Wifi-7', '/images/wifiap.jpg', '4990.00', '8')
;
