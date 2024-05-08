package pl.edu.wszib.ecom.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.edu.wszib.ecom.Exception.ResourceNotFound;
import pl.edu.wszib.ecom.Model.Product;
import pl.edu.wszib.ecom.Repository.ProductRepository;
import pl.edu.wszib.ecom.Service.ProductService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/products")
@PreAuthorize("permitAll()")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
    @PostMapping("/add-new-product")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> addNewProduct(@RequestBody Product newProduct){
        productRepository.save(newProduct);
        return ResponseEntity.ok(newProduct);
    }
    @GetMapping("{name}/{size}")
    public Product getProdByNameAndSize(@PathVariable String name, @PathVariable double size){
        return  productRepository.findByNameAndSize(name,size);
    }
    @GetMapping("/getById/{id}")
    public Product getProdByID(@PathVariable long id){
        return  productRepository.findById(id).orElseThrow(() -> new ResourceNotFound("ID not found in db " + id));


    }
    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteProd(@PathVariable long id){
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFound("ID not found in db " + id));
        productRepository.delete(product);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("{name}/{size}")
    public ResponseEntity<Product> updateProd(@PathVariable String name, @PathVariable double size, @RequestBody Product prodUp){
        Product product = productRepository.findByNameAndSize(name,size);
        if (product!=null){
            productService.saveProduct(prodUp);
            return ResponseEntity.ok(product);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{type}")
    public List<Product> getProductsByType(@PathVariable String type){
        return productRepository.findByType(type);

    }

}
