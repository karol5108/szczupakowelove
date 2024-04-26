package pl.edu.wszib.ecom.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.wszib.ecom.Model.Product;
import pl.edu.wszib.ecom.Repository.ProductRepository;

import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;


    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void saveProduct(Product product) {
        System.out.println(productExists(product));
        if (!productExists(product)) {
            productRepository.save(product);
        }else {
            Product existingProduct = productRepository.findByNameAndSize(product.getName(), product.getSize());
            if (!existingProduct.equals(product)){
                existingProduct.setDescription(product.getDescription());
                existingProduct.setName(product.getName());
                existingProduct.setWeight(product.getWeight());
                existingProduct.setType(product.getType());
                existingProduct.setImg(product.getImg());
                existingProduct.setColors(product.getColors());
                existingProduct.setPrice(product.getPrice());
                existingProduct.setQuantity(product.getQuantity());
                existingProduct.setColorsImg(product.getColorsImg());
                existingProduct.setSize(product.getSize());
                existingProduct.setVideo(product.getVideo());
                existingProduct.setLowest30price(product.getLowest30price());
                productRepository.save(existingProduct);
            }
        }

    }

    private void updateProductAtImport(Product product) {

    }

    private boolean productExists(Product product) {
        return productRepository.existsProductByNameAndSize(product.getName(), product.getSize());
    }
}
