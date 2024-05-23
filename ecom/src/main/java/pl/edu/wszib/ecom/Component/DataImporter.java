package pl.edu.wszib.ecom.Component;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import pl.edu.wszib.ecom.Model.Product;
import pl.edu.wszib.ecom.Repository.ProductRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import pl.edu.wszib.ecom.Service.ProductService;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class DataImporter {
    @Value("${asortyment}")
    private String file;

    private final ResourceLoader resourceLoader;
    private final ProductService productService;

    public DataImporter(ResourceLoader resourceLoader, ProductService productService) {
        this.resourceLoader = resourceLoader;
        this.productService = productService;
    }

    public void importDataFromExcel() throws IOException {
        // Dynamiczne pobieranie pliku z użyciem ResourceLoader
        Resource resource = resourceLoader.getResource("classpath:static/" + file);


        try (InputStream inputStream = resource.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);

            // Odczytaj arkusz 'asortyment'
            Sheet sheet = workbook.getSheet("asortyment");
            Iterator<Row> rowIterator = sheet.iterator();

            // Skip header row
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                System.out.println(row);
                Product product = createProductFromRow(row);
                productService.saveProduct(product);
            }

            workbook.close();
        } catch (IOException e) {
            // Obsługa wyjątku
            e.printStackTrace();
        }
    }

    private Product createProductFromRow(Row row) {
        System.out.println(row);
        Product product = new Product();
        product.setName(row.getCell(1).getStringCellValue());
        product.setType(row.getCell(2).getStringCellValue());
        product.setImg("img.jpg");
        product.setVideo("video.mp4");

        int colorCount = (int) row.getCell(5).getNumericCellValue();
        product.setColors(colorCount);

        // Obsługa oddzielonych linków do zdjęć
        String colorsImg = row.getCell(6).getStringCellValue();
        String[] colorsImgArray = colorsImg.split("\\+");

        // Ustawianie listy linków do zdjęć
        List<String> colorsImgList = new ArrayList<>();
//        for (String img : colorsImgArray) {
//            colorsImgList.add(img);
//        }
        for (int i = 0; i < colorCount; i++) {
            char colorChar = (char) ('a' + i); // a, b, c, ...
            colorsImgList.add(colorChar + ".jpg");
        }
        product.setColorsImg(colorsImgList);
        product.setColorsImg(colorsImgList);

        product.setSize(row.getCell(7).getNumericCellValue());
        product.setQuantity((int) row.getCell(8).getNumericCellValue());
        product.setPrice(BigDecimal.valueOf(row.getCell(9).getNumericCellValue()));
        product.setWeight(row.getCell(10).getNumericCellValue());
        product.setDescription(row.getCell(11).getStringCellValue());
        product.setLowest30price(BigDecimal.valueOf(row.getCell(12).getNumericCellValue()));

        return product;
    }


}