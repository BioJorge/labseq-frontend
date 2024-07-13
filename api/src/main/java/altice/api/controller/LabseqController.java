package altice.api.controller;

import altice.api.service.LabseqService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/labseq")
@Tag(name = "Labseq Route", description = "Endpoints for calculating Labseq sequence")
@CrossOrigin(origins = "http://localhost:5173") // Ajuste conforme necessário
public class LabseqController {

    private final LabseqService labseqService;

    public LabseqController(LabseqService labseqService) {
        this.labseqService = labseqService;
    }

    @GetMapping("/{n}")
    @Operation(summary = "Get Labseq value", description = "Calculates the nth value of the Labseq sequence")
    @ApiResponse(responseCode = "200", description = "Successful operation")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    public long getLabseq(
            @Parameter(description = "Index of the Labseq sequence (non-negative integer)")
            @PathVariable int n) {
        return labseqService.calculateLabseq(n);
    }
}