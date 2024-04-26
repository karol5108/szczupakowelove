package pl.edu.wszib.ecom.Controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.wszib.ecom.Component.DataImporter;

import java.io.IOException;

@RestController
public class DataImportController {
    private final DataImporter dataImporter;


    public DataImportController(DataImporter dataImporter) {
        this.dataImporter = dataImporter;
    }

    @PostMapping("/import")
    public ResponseEntity<String> importData() {
        try {
            dataImporter.importDataFromExcel();
            return ResponseEntity.ok("Dane zaimportowane pomyślnie");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Błąd podczas importowania danych: " + e.getMessage());
        }
    }
}
