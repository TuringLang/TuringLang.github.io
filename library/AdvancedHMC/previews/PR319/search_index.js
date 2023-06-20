var documenterSearchIndex = {"docs":
[{"location":"api/#AdvancedHMC.jl","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"","category":"section"},{"location":"api/","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Documentation for AdvancedHMC.jl","category":"page"},{"location":"api/","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"","category":"page"},{"location":"api/#Structs","page":"AdvancedHMC.jl","title":"Structs","text":"","category":"section"},{"location":"api/","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"ClassicNoUTurn","category":"page"},{"location":"api/#AdvancedHMC.ClassicNoUTurn","page":"AdvancedHMC.jl","title":"AdvancedHMC.ClassicNoUTurn","text":"struct ClassicNoUTurn{F<:AbstractFloat} <: AdvancedHMC.DynamicTerminationCriterion\n\nClassic No-U-Turn criterion as described in Eq. (9) in [1].\n\nInformally, this will terminate the trajectory expansion if continuing the simulation either forwards or backwards in time will decrease the distance between the left-most and right-most positions.\n\nFields\n\nmax_depth::Int64\nΔ_max::AbstractFloat\n\nReferences\n\nHoffman, M. D., & Gelman, A. (2014). The No-U-Turn Sampler: adaptively setting path lengths in Hamiltonian Monte Carlo. Journal of Machine Learning Research, 15(1), 1593-1623. (arXiv)\n\n\n\n\n\n","category":"type"},{"location":"api/#Functions","page":"AdvancedHMC.jl","title":"Functions","text":"","category":"section"},{"location":"api/","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"sample","category":"page"},{"location":"api/#StatsBase.sample","page":"AdvancedHMC.jl","title":"StatsBase.sample","text":"sample(\n    rng::AbstractRNG,\n    h::Hamiltonian,\n    κ::AbstractMCMCKernel,\n    θ::AbstractVecOrMat{T},\n    n_samples::Int,\n    adaptor::AbstractAdaptor=NoAdaptation(),\n    n_adapts::Int=min(div(n_samples, 10), 1_000);\n    drop_warmup::Bool=false,\n    verbose::Bool=true,\n    progress::Bool=false\n)\n\nSample n_samples samples using the proposal κ under Hamiltonian h.\n\nThe randomness is controlled by rng. \nIf rng is not provided, GLOBAL_RNG will be used.\nThe initial point is given by θ.\nThe adaptor is set by adaptor, for which the default is no adaptation.\nIt will perform n_adapts steps of adaptation, for which the default is the minimum of 1_000 and 10% of n_samples\ndrop_warmup controls to drop the samples during adaptation phase or not\nverbose controls the verbosity\nprogress controls whether to show the progress meter or not\n\n\n\n\n\nsample(\n    model::AbstractMCMC.LogDensityModel,\n    kernel::AdvancedHMC.AbstractMCMCKernel,\n    metric::AdvancedHMC.AbstractMetric,\n    adaptor::AdvancedHMC.Adaptation.AbstractAdaptor,\n    N::Integer;\n    kwargs...\n)\n\n\nA convenient wrapper around AbstractMCMC.sample avoiding explicit construction of HMCSampler.\n\n\n\n\n\n","category":"function"},{"location":"api/#Index","page":"AdvancedHMC.jl","title":"Index","text":"","category":"section"},{"location":"api/","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"","category":"page"},{"location":"#AdvancedHMC.jl","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"(Image: CI) (Image: DOI) (Image: Coverage Status) (Image: Stable) (Image: Dev)","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"AdvancedHMC.jl provides a robust, modular and efficient implementation of advanced HMC algorithms. An illustrative example for AdvancedHMC's usage is given below. AdvancedHMC.jl is part of Turing.jl, a probabilistic programming library in Julia.  If you are interested in using AdvancedHMC.jl through a probabilistic programming language, please check it out!","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Interfaces","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"IMP.hmc: an experimental Python module for the Integrative Modeling Platform, which uses AdvancedHMC in its backend to sample protein structures.","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"NEWS","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"We presented a paper for AdvancedHMC.jl at AABI 2019 in Vancouver, Canada. (abs, pdf, OpenReview)\nWe presented a poster for AdvancedHMC.jl at StanCon 2019 in Cambridge, UK. (pdf)","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"API CHANGES","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"[v0.2.22] Three functions are renamed.\nPreconditioner(metric::AbstractMetric) -> MassMatrixAdaptor(metric) and \nNesterovDualAveraging(δ, integrator::AbstractIntegrator) -> StepSizeAdaptor(δ, integrator)\nfind_good_eps -> find_good_stepsize\n[v0.2.15] n_adapts is no longer needed to construct StanHMCAdaptor; the old constructor is deprecated.\n[v0.2.8] Two Hamiltonian trajectory sampling methods are renamed to avoid a name clash with Distributions.\nMultinomial -> MultinomialTS\nSlice -> SliceTS\n[v0.2.0] The gradient function passed to Hamiltonian is supposed to return a value-gradient tuple now.","category":"page"},{"location":"#A-minimal-example-sampling-from-a-multivariate-Gaussian-using-NUTS","page":"AdvancedHMC.jl","title":"A minimal example - sampling from a multivariate Gaussian using NUTS","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"In this section we demonstrate a minimal example of sampling from a multivariate Gaussian (10 dimensional) using the no U-turn sampler (NUTS). Below we describe the major components of the Hamiltonian system which are essential to sample using this approach:","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Metric: In many sampling problems the sample space is usually associated with a metric, that allows us to measure the distance between any two points, and other similar quantities. In the example in this section, we use a special metric called the Euclidean Metric, represented with a D × D matrix from which we can compute distances. ","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"<details>  <summary>Further details about the Metric component</summary>  The Euclidean metric is also known as the mass matrix in the physical perspective. For available metrics refer <a href=\"#hamiltonian-mass-matrix-metric\">Hamiltonian mass matrix</a>. </details>","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Leapfrog integration: Leapfrog integration is a second-order numerical method for integrating differential equations (In this case they are, equations of motion for the relative position of one particle with respect to the other). The order of this integration signifies its rate of convergence. Any alogrithm with a finite time step size will have numerical errors and the order is related to this error. For a second-order algorithm, this error scales as the second power of the time step, hence, the name second-order. High-order intergrators are usually complex to code and have a limited region of convergence, hence they do not allow arbitrarily large time steps. A second-order integrator is suitable for our purpose, hence we opt for the leapfrog integrator. It is called leapfrog due to the ways this algorithm is written, where the positions and velocities of particles leap over each other. ","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"<details>  <summary>About the leapfrog integration scheme</summary>  Suppose bf x and bf v are the position and velocity of an individual particle respectively; i and i+1 are the indices for time values t_i and t_i+1 respectively; dt = t_i+1 - t_i is the time step size (constant and regularly spaced intervals); and bf a is the acceleration induced on a particle by the forces of all other particles. Furthermore, suppose positions are defined at times t_i t_i+1 t_i+2 dots  spaced at constant intervals dt, the velocities are defined at halfway times in between, denoted by t_i-12 t_i+12 t_i+32 dots  where t_i+1 - t_i + 12 = t_i + 12 - t_i = dt  2, and the accelerations bf a are defined only on integer times, just like the positions. Then the leapfrog integration scheme is given as: x_i = x_i-1 + v_i-12 dt quad v_i+12 = v_i-12 + a_i dt. For available integrators refer <a href=\"#integrator-integrator\">Integrator</a>. </details>","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Proposal for trajectories (static or dynamic): Different types of proposals can be used, which maybe static or dynamic. At each iteration of any variant of the HMC algorithm there are two main steps - the first step changes the momentum and the second step may change both the position and the momentum of a particle. ","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"<details>  <summary>More about the proposals</summary>  In the classical HMC approach, during the first step, new values for the momentum variables are randomly drawn from their Gaussian distribution, independently of the current values of the position variables. Whereas, during the second step, a Metropolis update is performed, using Hamiltonian dynamics to provide a new state. For available proposals refer <a href=\"#proposal-proposal\">Proposal</a>. </details>","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"using AdvancedHMC, ForwardDiff\nusing LogDensityProblems\nusing LinearAlgebra\n\n# Define the target distribution using the `LogDensityProblem` interface\nstruct LogTargetDensity\n    dim::Int\nend\nLogDensityProblems.logdensity(p::LogTargetDensity, θ) = -sum(abs2, θ) / 2  # standard multivariate normal\nLogDensityProblems.dimension(p::LogTargetDensity) = p.dim\nLogDensityProblems.capabilities(::Type{LogTargetDensity}) = LogDensityProblems.LogDensityOrder{0}()\n\n# Choose parameter dimensionality and initial parameter value\nD = 10; initial_θ = rand(D)\nℓπ = LogTargetDensity(D)\n\n# Set the number of samples to draw and warmup iterations\nn_samples, n_adapts = 2_000, 1_000\n\n# Define a Hamiltonian system\nmetric = DiagEuclideanMetric(D)\nhamiltonian = Hamiltonian(metric, ℓπ, ForwardDiff)\n\n# Define a leapfrog solver, with initial step size chosen heuristically\ninitial_ϵ = find_good_stepsize(hamiltonian, initial_θ)\nintegrator = Leapfrog(initial_ϵ)\n\n# Define an HMC sampler, with the following components\n#   - multinomial sampling scheme,\n#   - generalised No-U-Turn criteria, and\n#   - windowed adaption for step-size and diagonal mass matrix\nproposal = NUTS{MultinomialTS, GeneralisedNoUTurn}(integrator)\nadaptor = StanHMCAdaptor(MassMatrixAdaptor(metric), StepSizeAdaptor(0.8, integrator))\n\n# Run the sampler to draw samples from the specified Gaussian, where\n#   - `samples` will store the samples\n#   - `stats` will store diagnostic statistics for each sample\nsamples, stats = sample(hamiltonian, proposal, initial_θ, n_samples, adaptor, n_adapts; progress=true)","category":"page"},{"location":"#Parallel-sampling","page":"AdvancedHMC.jl","title":"Parallel sampling","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"AdvancedHMC enables parallel sampling (either distributed or multi-thread) via Julia's parallel computing functions. It also supports vectorized sampling for static HMC and has been discussed in more detail in the documentation here.","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"The below example utilizes the @threads macro to sample 4 chains across 4 threads.","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"# Ensure that julia was launched with appropriate number of threads\nprintln(Threads.nthreads())\n\n# Number of chains to sample\nnchains = 4\n\n# Cache to store the chains\nchains = Vector{Any}(undef, nchains)\n\n# The `samples` from each parallel chain is stored in the `chains` vector \n# Adjust the `verbose` flag as per need\nThreads.@threads for i in 1:nchains\n  samples, stats = sample(hamiltonian, proposal, initial_θ, n_samples, adaptor, n_adapts; verbose=false)\n  chains[i] = samples\nend","category":"page"},{"location":"#GPU-Sampling-with-CUDA","page":"AdvancedHMC.jl","title":"GPU Sampling with CUDA","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"There is experimental support for running static HMC on the GPU using CUDA.  To do so the user needs to have CUDA.jl installed, ensure the logdensity of the Hamiltonian can be executed on the GPU and that the initial points are a CuArray.  A small working example can be found at test/cuda.jl.","category":"page"},{"location":"#API-and-supported-HMC-algorithms","page":"AdvancedHMC.jl","title":"API and supported HMC algorithms","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"An important design goal of AdvancedHMC.jl is modularity; we would like to support algorithmic research on HMC. This modularity means that different HMC variants can be easily constructed by composing various components, such as preconditioning metric (i.e. mass matrix), leapfrog integrators,  trajectories (static or dynamic), and adaption schemes etc.  The minimal example above can be modified to suit particular inference problems by picking components from the list below.","category":"page"},{"location":"#Hamiltonian-mass-matrix-(metric)","page":"AdvancedHMC.jl","title":"Hamiltonian mass matrix (metric)","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Unit metric: UnitEuclideanMetric(dim)\nDiagonal metric: DiagEuclideanMetric(dim)\nDense metric: DenseEuclideanMetric(dim)","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"where dim is the dimensionality of the sampling space.","category":"page"},{"location":"#Integrator-(integrator)","page":"AdvancedHMC.jl","title":"Integrator (integrator)","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Ordinary leapfrog integrator: Leapfrog(ϵ)\nJittered leapfrog integrator with jitter rate n: JitteredLeapfrog(ϵ, n)\nTempered leapfrog integrator with tempering rate a: TemperedLeapfrog(ϵ, a)","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"where ϵ is the step size of leapfrog integration.","category":"page"},{"location":"#Proposal-(proposal)","page":"AdvancedHMC.jl","title":"Proposal (proposal)","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Static HMC with a fixed number of steps (n_steps) (Neal, R. M. (2011)): StaticTrajectory(integrator, n_steps)\nHMC with a fixed total trajectory length (trajectory_length) (Neal, R. M. (2011)): HMCDA(integrator, trajectory_length) \nOriginal NUTS with slice sampling (Hoffman, M. D., & Gelman, A. (2014)): NUTS{SliceTS,ClassicNoUTurn}(integrator)\nGeneralised NUTS with slice sampling (Betancourt, M. (2017)): NUTS{SliceTS,GeneralisedNoUTurn}(integrator)\nOriginal NUTS with multinomial sampling (Betancourt, M. (2017)): NUTS{MultinomialTS,ClassicNoUTurn}(integrator)\nGeneralised NUTS with multinomial sampling (Betancourt, M. (2017)): NUTS{MultinomialTS,GeneralisedNoUTurn}(integrator)","category":"page"},{"location":"#Adaptor-(adaptor)","page":"AdvancedHMC.jl","title":"Adaptor (adaptor)","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Adapt the mass matrix metric of the Hamiltonian dynamics: mma = MassMatrixAdaptor(metric)\nThis is lowered to UnitMassMatrix, WelfordVar or WelfordCov based on the type of the mass matrix metric\nAdapt the step size of the leapfrog integrator integrator: ssa = StepSizeAdaptor(δ, integrator)\nIt uses Nesterov's dual averaging with δ as the target acceptance rate.\nCombine the two above naively: NaiveHMCAdaptor(mma, ssa)\nCombine the first two using Stan's windowed adaptation: StanHMCAdaptor(mma, ssa)","category":"page"},{"location":"#Gradients","page":"AdvancedHMC.jl","title":"Gradients","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"AdvancedHMC supports both AD-based (Zygote, Tracker and ForwardDiff) and user-specified gradients. In order to use user-specified gradients, please replace ForwardDiff with ℓπ_grad in the Hamiltonian  constructor, where the gradient function ℓπ_grad should return a tuple containing both the log-posterior and its gradient. ","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"All the combinations are tested in this file except from using tempered leapfrog integrator together with adaptation, which we found unstable empirically.","category":"page"},{"location":"#The-sample-function-signature-in-detail","page":"AdvancedHMC.jl","title":"The sample function signature in detail","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"function sample(\n    rng::Union{AbstractRNG, AbstractVector{<:AbstractRNG}},\n    h::Hamiltonian,\n    κ::HMCKernel,\n    θ::AbstractVector{<:AbstractFloat},\n    n_samples::Int,\n    adaptor::AbstractAdaptor=NoAdaptation(),\n    n_adapts::Int=min(div(n_samples, 10), 1_000);\n    drop_warmup=false,\n    verbose::Bool=true,\n    progress::Bool=false,\n)","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Draw n_samples samples using the proposal κ under the Hamiltonian system h","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"The randomness is controlled by rng.\nIf rng is not provided, GLOBAL_RNG will be used.\nThe initial point is given by θ.\nThe adaptor is set by adaptor, for which the default is no adaptation.\nIt will perform n_adapts steps of adaptation, for which the default is 1_000 or 10% of n_samples, whichever is lower. \ndrop_warmup specifies whether to drop samples.\nverbose controls the verbosity.\nprogress controls whether to show the progress meter or not.","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Note that the function signature of the sample function exported by AdvancedHMC.jl differs from the sample function used by Turing.jl. We refer to the documentation of Turing.jl for more details on the latter.","category":"page"},{"location":"#Citing-AdvancedHMC.jl","page":"AdvancedHMC.jl","title":"Citing AdvancedHMC.jl","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"If you use AdvancedHMC.jl for your own research, please consider citing the following publication:","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Kai Xu, Hong Ge, Will Tebbutt, Mohamed Tarek, Martin Trapp, Zoubin Ghahramani: \"AdvancedHMC.jl: A robust, modular and efficient implementation of advanced HMC algorithms.\", Symposium on Advances in Approximate Bayesian Inference, 2020. (abs, pdf)","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"with the following BibTeX entry:","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"@inproceedings{xu2020advancedhmc,\n  title={AdvancedHMC. jl: A robust, modular and efficient implementation of advanced HMC algorithms},\n  author={Xu, Kai and Ge, Hong and Tebbutt, Will and Tarek, Mohamed and Trapp, Martin and Ghahramani, Zoubin},\n  booktitle={Symposium on Advances in Approximate Bayesian Inference},\n  pages={1--10},\n  year={2020},\n  organization={PMLR}\n}","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"If you using AdvancedHMC.jl directly through Turing.jl, please consider citing the following publication:","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Hong Ge, Kai Xu, and Zoubin Ghahramani: \"Turing: a language for flexible probabilistic inference.\", International Conference on Artificial Intelligence and Statistics, 2018. (abs, pdf)","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"with the following BibTeX entry:","category":"page"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"@inproceedings{ge2018turing,\n  title={Turing: A language for flexible probabilistic inference},\n  author={Ge, Hong and Xu, Kai and Ghahramani, Zoubin},\n  booktitle={International Conference on Artificial Intelligence and Statistics},\n  pages={1682--1690},\n  year={2018},\n  organization={PMLR}\n}","category":"page"},{"location":"#References","page":"AdvancedHMC.jl","title":"References","text":"","category":"section"},{"location":"","page":"AdvancedHMC.jl","title":"AdvancedHMC.jl","text":"Neal, R. M. (2011). MCMC using Hamiltonian dynamics. Handbook of Markov chain Monte Carlo, 2(11), 2. (arXiv)\nBetancourt, M. (2017). A Conceptual Introduction to Hamiltonian Monte Carlo. arXiv preprint arXiv:1701.02434.\nGirolami, M., & Calderhead, B. (2011). Riemann manifold Langevin and Hamiltonian Monte Carlo methods. Journal of the Royal Statistical Society: Series B (Statistical Methodology), 73(2), 123-214. (arXiv)\nBetancourt, M. J., Byrne, S., & Girolami, M. (2014). Optimizing the integrator step size for Hamiltonian Monte Carlo. arXiv preprint arXiv:1411.6669.\nBetancourt, M. (2016). Identifying the optimal integration time in Hamiltonian Monte Carlo. arXiv preprint arXiv:1601.00225.\nHoffman, M. D., & Gelman, A. (2014). The No-U-Turn Sampler: adaptively setting path lengths in Hamiltonian Monte Carlo. Journal of Machine Learning Research, 15(1), 1593-1623. (arXiv)","category":"page"}]
}
