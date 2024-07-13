package altice.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@Tag(name = "Hello World", description = "Endpoint for saying hello")
public class HelloController {

    @GetMapping
    @Operation(summary = "Get saudation", description = "Returns a welcome message")
    @ApiResponse(responseCode = "200", description = "Operation successful")
    public String hello() {
        return "Welcome to the API! Use /labseq/{n} to calculate the nth value of the Labseq sequence.";
    }
}